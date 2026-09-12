<#
    Akhuratha Mandap - image optimiser
    ----------------------------------
    Phone photos come off the camera at 3456x4608 and 3-6 MB each. The site
    never displays them larger than about 1600px, so serving the originals
    means a visitor downloads ~50x more bytes than they can actually see -
    which is why the gallery appeared blank while it slowly loaded.

    This script rewrites the images in place at a sensible display size and
    keeps a pristine copy of every original under  tools/../originals/ ,
    which is outside both  public/  and  src/assets/  and so is never served
    or bundled.

    Re-run it after adding new photos:

        powershell -ExecutionPolicy Bypass -File tools/optimize-images.ps1

    Already-optimised files are skipped, so running it twice is harmless.
#>

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'
$root      = Split-Path -Parent $PSScriptRoot
$originals = Join-Path $root 'originals'

# Longest-edge budget per folder. Anything already at or under it is skipped.
$targets = @(
    @{ Path = (Join-Path $root 'src\assets\images'); MaxEdge = 1600; Quality = 82 },
    @{ Path = (Join-Path $root 'public\images');     MaxEdge = 1920; Quality = 80 }
)

# Assets that are always drawn small, whatever folder they live in.
# The medallion renders at most 360 CSS px, so 720 covers a 2x display.
$overrides = @{
    "AKM-Round.png"  = 720
    "Logo-Round.jpg" = 320
    "Logo.jpg"       = 480
}

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
             Where-Object { $_.MimeType -eq 'image/jpeg' }

function Invoke-Resize {
    param(
        [string] $InPath,
        [string] $OutPath,
        [int]    $MaxEdge,
        [int]    $Quality
    )

    $img = [System.Drawing.Image]::FromFile($InPath)
    try {
        # Honour the EXIF orientation tag, which phones set instead of
        # rotating the pixels. Browsers apply it; System.Drawing does not.
        if ($img.PropertyIdList -contains 274) {
            switch ($img.GetPropertyItem(274).Value[0]) {
                3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
                6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)  }
                8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
            }
        }

        $scale = [Math]::Min(1.0, $MaxEdge / [Math]::Max($img.Width, $img.Height))
        $w = [int][Math]::Round($img.Width  * $scale)
        $h = [int][Math]::Round($img.Height * $scale)

        $isPng = [IO.Path]::GetExtension($OutPath).ToLower() -eq '.png'

        $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $g   = [System.Drawing.Graphics]::FromImage($bmp)
        $g.CompositingQuality = 'HighQuality'
        $g.InterpolationMode  = 'HighQualityBicubic'
        $g.SmoothingMode      = 'HighQuality'
        $g.PixelOffsetMode    = 'HighQuality'
        # JPEG has no alpha channel, so give it an opaque ground first.
        if (-not $isPng) { $g.Clear([System.Drawing.Color]::White) }
        $g.DrawImage($img, 0, 0, $w, $h)
        $g.Dispose()

        if ($isPng) {
            $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
        } else {
            $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                [System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality)
            $bmp.Save($OutPath, $jpegCodec, $ep)
            $ep.Dispose()
        }
        $bmp.Dispose()

        return @{ Width = $w; Height = $h }
    }
    finally { $img.Dispose() }
}

$savedBytes = 0
$converted  = 0
$skipped    = 0

foreach ($t in $targets) {
    if (-not (Test-Path $t.Path)) { continue }

    Get-ChildItem $t.Path -File -Recurse -Include *.jpg, *.jpeg, *.png | ForEach-Object {
        $src = $_.FullName

        # Where this file lives relative to the project, so the archive mirrors it.
        $rel        = $src.Substring($root.Length).TrimStart('\')
        $archivePath = Join-Path $originals $rel

        # Measure first: leave anything already within budget alone.
        $probe = [System.Drawing.Image]::FromFile($src)
        $maxEdge = [Math]::Max($probe.Width, $probe.Height)
        $probe.Dispose()

        $maxAllowed = $t.MaxEdge
        if ($overrides.ContainsKey($_.Name)) { $maxAllowed = $overrides[$_.Name] }

        if ($maxEdge -le $maxAllowed -and $_.Length -lt 400KB) {
            $script:skipped++
            return
        }

        New-Item -ItemType Directory -Force -Path (Split-Path $archivePath) | Out-Null
        if (-not (Test-Path $archivePath)) { Copy-Item $src $archivePath }

        $before = $_.Length
        $tmp    = "$src.opt"

        # Always resize from the pristine copy, so repeat runs never
        # re-compress an already-compressed file.
        $dims = Invoke-Resize -InPath $archivePath -OutPath $tmp -MaxEdge $maxAllowed -Quality $t.Quality

        $after = (Get-Item $tmp).Length
        if ($after -lt $before) {
            Move-Item $tmp $src -Force
            $script:savedBytes += ($before - $after)
            $script:converted++
            '{0,-34} {1,7:N0} KB -> {2,6:N0} KB  ({3}x{4})' -f `
                $_.Name, ($before/1KB), ($after/1KB), $dims.Width, $dims.Height
        } else {
            Remove-Item $tmp -Force
            $script:skipped++
        }
    }
}

''
'Optimised : {0} file(s)'      -f $converted
'Skipped   : {0} file(s)'      -f $skipped
'Saved     : {0:N1} MB'        -f ($savedBytes/1MB)
'Originals : {0}'              -f $originals
