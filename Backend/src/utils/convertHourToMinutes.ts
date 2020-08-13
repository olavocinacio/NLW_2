export default function convertHourToMinutes(time: string){
    const [hour, minutes] = time.split(':').map(Number); //Separa a hora dos minutos e transforma em um array de números
    const timeInMinutes =  (hour*60) + minutes;
    return timeInMinutes;
}