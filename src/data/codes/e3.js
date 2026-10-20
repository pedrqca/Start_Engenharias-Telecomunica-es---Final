export default `//Incluindo a biblioteca do Servo Motor
#include <Servo.h>

//Instanciando o objeto do Servo Motor
Servo motor;

//Definindo os pinos de cada componente
#define botao1 2
#define botao2 3
#define vermelho 4
#define amarelo 5
#define verde 6
#define azul 7
#define pot A0

void setup()
{
  //Definindo as entradas e saídas do circuito
  pinMode(botao1, INPUT);
  pinMode(botao2, INPUT);
  pinMode(pot, INPUT);

  pinMode(vermelho, OUTPUT);
  pinMode(amarelo, OUTPUT);
  pinMode(verde, OUTPUT);
  pinMode(azul, OUTPUT);

  //Definindo a porta em que o Servo Motor está ligado
  motor.attach(9);

  //Inicializando o Monitor Serial
  Serial.begin(9600);
}

void loop()
{
  //Criando variáveis para armazenar os estados dos botões
  int estado1 = digitalRead(botao1);
  int estado2 = digitalRead(botao2);

  //Criando variável para armazenar o valor de leitura do potenciômetro
  int poten = analogRead(pot);

  //Criando variável para movimentar o Servo Motor com o potenciômetro
  int posicao = map(poten, 0, 1023, 0, 180);

  //Se nenhum dos botões estiver pressionado
  if (estado1 == 0 and estado2 == 0)
  {
    //Potenciômetro controla o motor
    motor.write(posicao);
    delay(50);

    //Acionamento dos LEDs
    if (posicao <= 45)
    {
      digitalWrite(vermelho, HIGH);
      digitalWrite(amarelo, LOW);
      digitalWrite(verde, LOW);
      digitalWrite(azul, LOW);
    }

    else if (posicao > 45 and posicao <= 90)
    {
      digitalWrite(vermelho, LOW);
      digitalWrite(amarelo, HIGH);
      digitalWrite(verde, LOW);
      digitalWrite(azul, LOW);
    }

    else if (posicao > 90 and posicao <= 135)
    {
      digitalWrite(vermelho, LOW);
      digitalWrite(amarelo, LOW);
      digitalWrite(verde, HIGH);
      digitalWrite(azul, LOW);
    }

    else if (posicao > 135 and posicao <= 180)
    {
      digitalWrite(vermelho, LOW);
      digitalWrite(amarelo, LOW);
      digitalWrite(verde, LOW);
      digitalWrite(azul, HIGH);
    }
  }

  //Se o botão 1 estiver pressionado - Modo Scan
  else if (estado1 == 1 and estado2 == 0)
  {
    Serial.println("Iniciando a varredura...");
    //Varredura de 0 a 180° variando de 20 em 20°
    for (int angulo = 0; angulo <= 180; angulo += 20)
    {
      motor.write(angulo);
      //Acionamento dos LEDs
      if (angulo <= 45)
      {
        digitalWrite(vermelho, HIGH);
        digitalWrite(amarelo, LOW);
        digitalWrite(verde, LOW);
        digitalWrite(azul, LOW);
      }

      else if (angulo > 45 and angulo <= 90)
      {
        digitalWrite(vermelho, LOW);
        digitalWrite(amarelo, HIGH);
        digitalWrite(verde, LOW);
        digitalWrite(azul, LOW);
      }

      else if (angulo > 90 and angulo <= 135)
      {
        digitalWrite(vermelho, LOW);
        digitalWrite(amarelo, LOW);
        digitalWrite(verde, HIGH);
        digitalWrite(azul, LOW);
      }

      else if (angulo > 135 and angulo <= 180)
      {
        digitalWrite(vermelho, LOW);
        digitalWrite(amarelo, LOW);
        digitalWrite(verde, LOW);
        digitalWrite(azul, HIGH);
      }
      delay(200);
    }
  }

  //Se o botão 2 estiver pressionado - Modo Reset
  else if (estado1 == 0 and estado2 == 1)
  {
    Serial.println("Protocolo de Reset ativado: Retornando a posicao central!");
    //Motor travado em 90°
    motor.write(90);
  }

  //Se os dois botões estiverem pressionados
  else if (estado1 == 1 and estado2 == 1)
  {
    //Mensagem no monitor serial e LED verde pisca
    Serial.println("Iniciando telemetria...");
    digitalWrite(vermelho, LOW);
    digitalWrite(amarelo, LOW);
    digitalWrite(azul, LOW);
    digitalWrite(verde, HIGH);
    delay(500);
    digitalWrite(verde, LOW);
    delay(500);
  }
}`;