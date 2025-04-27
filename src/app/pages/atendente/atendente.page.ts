import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-atendente',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './atendente.page.html',
  styleUrls: ['./atendente.page.scss'],
})
export class AtendentePage {
  senhaAtual: any = null;
  ultimasChamadas: any[] = [];
  ultimaChamadaFoiSP = false;
  qtdSenhasNaoAtendidas: number | null = null;

  chamarProximaSenha() {
    let senhas = JSON.parse(localStorage.getItem('senhas') || '[]');
    senhas = senhas.filter((s: any) => !s.atendido);

    let proximaSenha: any = null;

    if (!this.ultimaChamadaFoiSP) {
      proximaSenha = senhas.find((s: any) => s.tipo === 'SP');
      this.ultimaChamadaFoiSP = true;
    } else {
      proximaSenha = senhas.find((s: any) => s.tipo === 'SE') || senhas.find((s: any) => s.tipo === 'SG');
      this.ultimaChamadaFoiSP = false;
    }

    if (proximaSenha) {
      proximaSenha.atendido = true;
      this.senhaAtual = proximaSenha;

      const index = senhas.findIndex((s: any) => s.numero === proximaSenha.numero);
      if (index !== -1) {
        senhas.splice(index, 1);
      }
      const todasSenhas = JSON.parse(localStorage.getItem('senhas') || '[]');
      const atualizadas = todasSenhas.map((s: any) =>
        s.numero === proximaSenha.numero ? proximaSenha : s
      );
      localStorage.setItem('senhas', JSON.stringify(atualizadas));

      this.ultimasChamadas.unshift(proximaSenha);
      if (this.ultimasChamadas.length > 5) {
        this.ultimasChamadas.pop();
      }
    } else {
      alert('Nenhuma senha disponível para atendimento.');
    }
    this.atualizarContadorSenhas();
  }

  formatarData(dataString: string) {
    const data = new Date(dataString);
    return data.toLocaleString();
  }

  encerrarExpediente() {
    if (confirm('Tem certeza que deseja encerrar o expediente? Todas as senhas serão apagadas!')) {
      localStorage.removeItem('senhas');
      this.senhaAtual = null;
      this.ultimasChamadas = [];
      this.ultimaChamadaFoiSP = false;
      alert('Expediente encerrado com sucesso!');
    }
    this.atualizarContadorSenhas();
  }

  atualizarContadorSenhas() {
    const senhas = JSON.parse(localStorage.getItem('senhas') || '[]');
    const naoAtendidas = senhas.filter((s: any) => !s.atendido);
    this.qtdSenhasNaoAtendidas = naoAtendidas.length;
  }
}
