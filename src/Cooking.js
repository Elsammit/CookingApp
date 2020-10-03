import React, { Component } from 'react';
import "./Cooking.css";

import katsukare from './img/katsukare.jpg';
import nikuzyaga from './img/nikuzyaga.jpg';
import omuraisu from './img/omuraisu.jpg';
import tonziru from './img/tonziru.jpg';
import mabodoufu from './img/mabodoufu.jpg';
import naporitan from './img/naporitan.jpg';
import kuzi from './img/kuzi.jpg';
import axios  from "axios";
import fetch from 'node-fetch' 

const MenuList = ["カレー","回鍋肉","ナスのみそ炒め","ナポリタン","チャプチェ","親子丼","グラタン","肉じゃが","ピーマンの肉詰め","麻婆豆腐","冷しゃぶ","お好み焼き","餃子","ビシソワーズ","オムライス"];
const ImgList = [katsukare, nikuzyaga, omuraisu, tonziru, mabodoufu, naporitan];
 
axios.defaults.baseURL = 'http://192.168.56.101';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://192.168.56.101:3000';
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true';


export default class Cooking extends Component  {
    constructor (props) {
        super(props);
        this.state = {
            Menu:"",
            Url:"https://delishkitchen.tv/search?q=",
            Num:1,
            scole:0
        };
        this.ImgInit();
    }

    async test(){
        //const url = 'https://business.nikkei.com'
        var response = await fetch('https://business.nikkei.com',{
            mode:'no-cors',
            Credentials:'omit',
            method:"GET",
            headers:{
                Origin:'http://192.168.56.101:3000',
                Type:'application/json',
            }

        }).then(
            ( result => {
                console.log("OK")
                console.log(result
                    )
              }),
        ).catch(function(error){
            console.log("NG 2")
            console.log(error)
        })
        return response;
    }

    async componentDidMount(){
        var res = await this.test();
        console.log("===================")
        console.log(res) 
        console.log("===================")
    }
    

    ClickStart = () => {
        var buf = Math.floor(Math.random() * (MenuList.length));

        console.log("メニューは"+MenuList[buf]+" 番号は"+buf);

        this.setState({
            Menu:MenuList[buf]
        });
    }
    
    ShowMenu = () => {
        const {Menu} = this.state;
        const {Url} = this.state;

        const URL = Url + encodeURI(Menu);

        return(<div>
            <title>Cooking App</title>
    <div className="CookResult">
        <input type="button" id="StButton"　className="StButton" value="スタート" onClick={this.ClickStart}></input><br/>
    </div>
    <div className="Result">
        {
            function(){
                if(Menu ===""){
                    return (
                        <a></a>
                    );
                }else{
                    return (
                        <form>
                            <a>今夜の献立： </a>  <u　className="kondate" color="Red" >{Menu}</u>
                            <br/>
                            <iframe src={URL} width="400" height="500"></iframe>
                        </form>
                    );
                }
            }()
        }
        </div>
        </div>);
    }

    ImgListFunc = () => {
        const {Num} = this.state;
        
        var buf = Num;
        if(Num < (ImgList.length - 2)){
            buf=buf+1;
        }else{
            buf = 1;
        }
        this.setState({
            Num:buf
        });
    }

    ImgInit = () =>{
        this.intervalId = setInterval(()=>{
            this.ImgListFunc();
        }, 1000);
    }

    render() {
        const {Num} = this.state;

        return (<div>
            <div className="cookingList">
            <table >
                <tbody>
                <tr>
                    <td><img src={ImgList[Num-1]} alt="カレー" className="cookimg" /></td>
                    <td><img src={ImgList[Num]} alt="肉じゃが" className="cookimg" /></td>
                    <td><img src={ImgList[Num+1]} alt="オムライス" className="cookimg" /></td>
                </tr>
                </tbody>
            </table>
            </div>
            <div className="title">
                <u>料理決めルーレット</u><br/>
            </div>
            <img src={kuzi} alt="オムライス" className="kuzi" />
            {this.ShowMenu()}
            </div>);
    }
  }