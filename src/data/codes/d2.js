export default `//Definindo os pinos de cada componente
#define botao1 2
#define botao2 7
#define red 3
#define blue 5
#define green 6

void setup()
{
  //Definindo as entradas e saídas do circuito
  pinMode(botao1, INPUT);
  pinMode(botao2, INPUT);

  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);

  //Inicializando o Monitor Serial
  Serial.begin(9600);
}

void loop()
{
  //Criando variáveis para armazenar os estados dos botões
  int estado1 = digitalRead(botao1);
  int estado2 = digitalRead(botao2);

  //Mostrando no Monitor Serial os estados dos botões
  Serial.print("Estado do botao1: ");
  Serial.println(estado1);
  Serial.print("Estado do botao2: ");
  Serial.println(estado2);

  //Se nenhum dos botões estiver pressionado
  if (estado1 == 0 and estado2 == 0)
  {
    //Standby - LED RGB desligado
    analogWrite(red, 0);
    analogWrite(green, 0);
    analogWrite(blue, 0);
    Serial.println("Standby");
    delay(300);
  }

  //Se o botão 1 estiver pressionado
  else if (estado1 == 1 and estado2 == 0)
  {
    //Segurança - LED RGB na cor Indigo
    analogWrite(red, 75);
    analogWrite(green, 0);
    analogWrite(blue, 130);
    Serial.println("Seguranca");
    delay(300);
  }

  //Se o botão 2 estiver pressionado
  else if (estado1 == 0 and estado2 == 1)
  {
    //Segurança - LED RGB na cor Yellow
    analogWrite(red, 255);
    analogWrite(green, 255);
    analogWrite(blue, 0);
    Serial.println("Alerta");
    delay(300);
  }

  //Se os dois botões estiverem pressionados
  else if (estado1 == 1 and estado2 == 1)
  {
    //Override Manual - LED RGB varia entre Red e Fuchsia
    analogWrite(red, 255);
    analogWrite(green, 0);
    analogWrite(blue, 0);
    delay(400);
    analogWrite(red, 255);
    analogWrite(green, 0);
    analogWrite(blue, 255);
    Serial.println("Override Manual");
    delay(400);
  }
}`;