export default `//Definindo os pinos de cada componente
#define botao 2
#define red 3
#define blue 5
#define green 6

void setup()
{
  //Definindo as entradas e saídas do circuito
  pinMode(botao, INPUT);

  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);

  //Inicializando o Monitor Serial
  Serial.begin(9600);
}

void loop()
{
  //Criando variável para armazenar o estado do botão
  int estado = digitalRead(botao);

  //Mostrando no Monitor Serial o estado do botão
  Serial.print("Estado do botao: ");
  Serial.println(estado);

  //Se o botão não estiver pressionado
  if (estado == 0)
  {
    //Todos os componentes desligados
    analogWrite(red, 248);
    analogWrite(green, 248);
    analogWrite(blue, 255);
    delay(500);
    analogWrite(red, 0);
    analogWrite(green, 0);
    analogWrite(blue, 0);
    delay(500);
  }

  //Se o botão estiver pressionado
  else
  {
    //Teste de lâmpada em 4 cores
    analogWrite(red, 128);
    analogWrite(green, 0);
    analogWrite(blue, 128);
    delay(300);
    analogWrite(red, 255);
    analogWrite(green, 255);
    analogWrite(blue, 0);
    delay(300);
    analogWrite(red, 0);
    analogWrite(green, 255);
    analogWrite(blue, 255);
    delay(300);
    analogWrite(red, 255);
    analogWrite(green, 165);
    analogWrite(blue, 0);
    delay(300);

    Serial.println("[STATUS] - EXECUTANDO TESTE DE LAMPADAS!");
  }
}`;