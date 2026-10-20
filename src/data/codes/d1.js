export default `//Definindo os pinos de cada componente
#define botao 2
#define vermelho 3
#define amarelo 4
#define verde 5
#define azul 6
#define buzzer 9

void setup()
{
  //Definindo as entradas e saídas do circuito
  pinMode(botao, INPUT);

  pinMode(vermelho, OUTPUT);
  pinMode(amarelo, OUTPUT);
  pinMode(verde, OUTPUT);
  pinMode(azul, OUTPUT);
  pinMode(buzzer, OUTPUT);
}

void loop()
{
  //Criando variável para armazenar o estado do botão
  int estado = digitalRead(botao);

  //Se o botão não estiver pressionado
  if (estado == 0)
  {
    //LEDs piscam juntos alternando com o Buzzer
    digitalWrite(vermelho, LOW);
    digitalWrite(amarelo, LOW);
    digitalWrite(verde, LOW);
    digitalWrite(azul, LOW);
    digitalWrite(buzzer, HIGH);
    delay(500);
    digitalWrite(vermelho, HIGH);
    digitalWrite(amarelo, HIGH);
    digitalWrite(verde, HIGH);
    digitalWrite(azul, HIGH);
    digitalWrite(buzzer, LOW);
    delay(500);
  }

  //Se o botão estiver pressionado
  else
  {
    //"Carregamento" de níveis e alerta sonoro
    digitalWrite(vermelho, LOW);
    digitalWrite(amarelo, LOW);
    digitalWrite(verde, LOW);
    digitalWrite(azul, LOW);
    analogWrite(buzzer, 0);
    delay(500);
    digitalWrite(vermelho, HIGH);
    digitalWrite(amarelo, LOW);
    digitalWrite(verde, LOW);
    digitalWrite(azul, LOW);
    analogWrite(buzzer, 0.25 * 255);
    delay(500);
    digitalWrite(vermelho, LOW);
    digitalWrite(amarelo, HIGH);
    digitalWrite(verde, LOW);
    digitalWrite(azul, LOW);
    analogWrite(buzzer, 0.5 * 255);
    delay(500);
    digitalWrite(vermelho, LOW);
    digitalWrite(amarelo, LOW);
    digitalWrite(verde, HIGH);
    digitalWrite(azul, LOW);
    analogWrite(buzzer, 0.75 * 255);
    delay(500);
    digitalWrite(vermelho, LOW);
    digitalWrite(amarelo, LOW);
    digitalWrite(verde, LOW);
    digitalWrite(azul, HIGH);
    analogWrite(buzzer, 255);
    delay(500);
  }
}`;