import * as moment from 'moment';

export default class Tweet {
    id: string = '';
    title: string = '';
    url: string = '';
    content: string = '';
    author: string = '';
    created_at: string = '';
    ask: string = '';
    user_id: string = '';
    points: number = 0;

    constructor(id:string,title:string,url:string,content:string,author:string, created_at:string ) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.content = content;
        this.author = author;
        if (created_at != "") {
            let date = created_at.split('-');
            let day = date[2].split('T');
            let time = day[1].split(':');
            let seconds = time[2].split('Z');
            let datetime = new Date(Number(date[0]),Number(date[1])-1,Number(day[0]),Number(time[0]),Number(time[1]),Number(seconds[0]));
            let today = new Date()
            let todaymoment = moment(today)
            let tweetmoment = moment(datetime)
            this.created_at = tweetmoment.from(todaymoment)
        }
    }

}