import * as moment from 'moment';

export default class User {
  id: number;
  username: string = '';
  karma: number;
  about: string = '';
  email: string = '';
  created_at: string = '';
  api_key: string = '';


  constructor(id:number, username:string, karma:number, about:string,
              email:string, created_at:string, api_key:string ) {
      this.id = id;
      this.username = username;
      this.karma = karma;
      this.about = about;
      this.email = email;
      
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
      
      this.api_key = api_key;
  }

}