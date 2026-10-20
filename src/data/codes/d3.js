export default `//Incluindo a biblioteca do Servo Motor
#include <Servo.h>

//Instanciando o objeto do Servo Motor
Servo motor;

//Definindo os pinos de cada componente
#define botao 2
#define vermelho 3
#define verde 4
#define pot A0

void setup()
{
  //Definindo as entradas e saídas do circuito
  pinMode(botao, INPUT);
  pinMode(pot, INPUT);

  pinMode(vermelho, OUTPUT);
  pinMode(verde, OUTPUT);

  //Definindo a porta em que o Servo Motor está ligado
  motor.attach(5);

  //Inicializando o Monitor Serial
  Serial.begin(9600);
}

void loop()
{
  //Criando variável para armazenar o estado do botão
  int estado = digitalRead(botao);

  //Criando variável para armazenar o valor de leitura do potenciômetro
  int poten = analogRead(pot);

  //Criando variável para movimentar o Servo Motor com o potenciômetro
  int posicao = map(poten, 0, 1023, 0, 180);

  //Criando variável para movimentar o Servo Motor com laço de repetição
  int angulo;

  //Se o botão não estiver pressionado
  if (estado == 0)
  {
    //Monitor Serial mostra o ângulo da antena o tempo todo
    Serial.print("Angulo da antena: ");
    Serial.println(posicao);

    //Potenciômetro controla o motor
    motor.write(posicao);

    //Acionamento dos LEDs
    if (posicao >= 60 and posicao <= 120)
    {
      digitalWrite(verde, HIGH);
      digitalWrite(vermelho, LOW);
    }

    else
    {
      digitalWrite(verde, LOW);
      digitalWrite(vermelho, HIGH);
    }
    delay(50);
  }

  //Se o botão estiver pressionado
  else if (estado == 1)
  {
    //Varredura de 0 a 180° variando de 5 em 5°
    for (angulo = 0; angulo <= 180; angulo += 5)
    {
      //Monitor Serial mostra o ângulo da antena o tempo todo
      Serial.print("Angulo da antena: ");
      Serial.println(angulo);
      motor.write(angulo);
      //Acionamento dos LEDs
      if (angulo >= 60 and angulo <= 120)
      {
        digitalWrite(verde, HIGH);
        digitalWrite(vermelho, LOW);
      }

      else
      {
        digitalWrite(verde, LOW);
        digitalWrite(vermelho, HIGH);
      }
      delay(300);
    }
  }
}`;