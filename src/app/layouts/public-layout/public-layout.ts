import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { ChatBox } from '../../shared/components/chat-box/chat-box';

@Component({
  selector: 'app-public-layout',
  imports: [Header, Footer, RouterOutlet, ChatBox],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout {}
