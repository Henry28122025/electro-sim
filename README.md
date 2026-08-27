# Fenachim Web3D — Complexo em escala humana

Experiência WebGL em primeira pessoa para apresentar o projeto **Aquecedor Híbrido: Biometano + Bicicleta 24 V DC + Rede Elétrica do Local** inserido em um complexo de feira inspirado na foto de referência fornecida.

## O que mudou nesta versão

- O visitante não controla mais uma maquete: ele **caminha pelo complexo em escala humana**.
- O entorno foi reconstruído proceduralmente com base na composição visual da foto: grandes pavilhões, pavilhão curvo, galpões, rua lateral, estacionamento, árvores, tendas e praça de eventos.
- Área do **Mini Parque Interativo: 20 m × 30 m = 600 m²**.
- Núcleo técnico interno: **3 m × 2 m**.
- Áreas separadas de pedaladas, aquecimento híbrido, biometano, rede elétrica local e painel de comparação energética.
- Minimap em tempo real para orientação.
- Controles em primeira pessoa e viagem rápida para os pontos principais.

> Importante: sem uma planta topográfica/CAD oficial do local, as dimensões gerais do entorno são **estimadas e proporcionais à foto**, não um levantamento cadastral. A foto original está em `public/site-reference.png` para futura calibração.

## Modelo energético do evento

A simulação agora usa um **dimensionamento físico configurável** em vez de uma divisão fixa de 70% / 5% / 25%. O painel considera lotação, litros de água por pessoa, temperatura de entrada e saída, perdas térmicas, janela de atendimento, potência do sistema a biometano e contribuição média das bicicletas.

O cenário-base foi ajustado para **1.363 pessoas simultaneamente no evento**, com consumo de água distribuído ao longo de 4 horas. O site também mostra o pior caso de todo o volume ter de ficar pronto em 1 hora.

## Controles

### Desktop

- `WASD` / setas: caminhar
- mouse: olhar ao redor
- `Shift`: andar mais rápido
- `E`: inspecionar componente na mira
- `Espaço`: pedalar quando estiver próximo das bicicletas
- `Esc`: liberar o mouse

### Mobile

- direcional virtual para andar
- área circular para olhar
- botão de inspeção

## Executar

No PowerShell, caso o Windows bloqueie `npm.ps1`, use `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
```

Ou no CMD:

```cmd
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Evolução para fidelidade máxima

Para deixar a reconstrução realmente métrica ao local real, substitua as estimativas do entorno por uma planta oficial/DWG/PDF ou medidas obtidas no local. Os componentes do aquecedor podem ser trocados por arquivos `.glb` exportados do Blender sem alterar a lógica da simulação.

## Dimensionamento energético do evento — cenário de 1.363 pessoas

A versão atual inclui um painel de estimativa energética configurável. O cenário-base considera:

- lotação de pico: **1.363 pessoas**;
- **1,0 L de água por pessoa** (cenário conservador de uma garrafa térmica por pessoa);
- água de entrada a **20 °C** e saída a **80 °C**;
- **10% de perdas térmicas** de armazenamento/distribuição;
- atendimento distribuído em **4 horas**;
- módulo a biometano com **20 kW térmicos úteis**;
- **3 bicicletas**, 120 W médios por estação e 65% de ocupação média;
- conversões conceituais: 98% rede elétrica→calor, 85% biometano→calor útil e 95% bicicleta→calor.

No cenário-base, o modelo calcula aproximadamente:

- **1.363 L** de água;
- **95,1 kWh** efetivamente transferidos para a água;
- **104,6 kWh térmicos úteis** ao incluir 10% de perdas;
- **26,2 kW térmicos médios** para realizar o atendimento em 4 horas;
- se todo o volume tivesse de ficar pronto em 1 hora, cerca de **104,6 kW térmicos** seriam necessários;
- contribuição útil aproximada em 4 h: **76,5% biometano**, **0,85% pedaladas** e **22,7% rede elétrica**;
- consumo elétrico convencional equivalente: **106,7 kWh**;
- consumo de rede no híbrido: cerca de **24,2 kWh**;
- economia estimada de energia da rede: cerca de **77,3%**.

Esses valores são de **engenharia conceitual/educacional**, não constituem dimensionamento executivo. O painel permite alterar a quantidade de pessoas, litros por pessoa, janela de atendimento e potência térmica do sistema a biometano para comparar cenários.
