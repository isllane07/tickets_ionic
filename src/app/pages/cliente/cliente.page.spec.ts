import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage {
  ultimaSenha: string | null = null;

  contadorSP = 0;
  contadorSG = 0;
  contadorSE = 0;

  emitirSenha(tipo: 'SP' | 'SG' | 'SE') {
    const agora = new Date();
    const ano = agora.getFullYear().toString().slice(2);
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
    const dia = agora.getDate().toString().padStart(2, '0');

    let contador: number;
    if (tipo === 'SP') {
      this.contadorSP++;
      contador = this.contadorSP;
    } else if (tipo === 'SG') {
      this.contadorSG++;
      contador = this.contadorSG;
    } else {
      this.contadorSE++;
      contador = this.contadorSE;
    }

    const seq = contador.toString().padStart(3, '0');

    const senha = `${ano}${mes}${dia}-${tipo}${seq}`;

    this.ultimaSenha = senha;

    const senhasExistentes = JSON.parse(localStorage.getItem('senhas') || '[]');
    senhasExistentes.push({
      numero: senha,
      tipo: tipo,
      dataHoraEmissao: agora.toISOString(),
      atendido: false,
    });
    localStorage.setItem('senhas', JSON.stringify(senhasExistentes));
  }
}
