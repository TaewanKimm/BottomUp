import React, { useState, useEffect } from 'react';
import Header from '../../Header/header'
import Footer from '../../Footer/footer'
import Manager from '../../Manager/manager'
import MatchTable from '../../MatchTable/matchTable';

import image1 from "../../../images/309478-P83VSI-858.jpg";

import { getManagerInfo, getCareerHighTier, getMatchID, getMatchData} from '../../../api/api';

function GameRecordPage(props) {

    const managerName = props.match.params.managerName;
    const [UserLevel, setUserLevel] = useState(0)
    const [Tier, setTier] = useState("")
    const [MatchData, setMatchData] =  useState(null)
    const [AveragePossession, setAveragePossession] = useState(0)
    const [AverageHeader, setAverageHeader] = useState(0)
    const [AverageLongShot, setAverageLongShot] = useState(0)

    useEffect(() => {
        async function getUserData(){
            const userInfo = await getManagerInfo(managerName)
            console.log(managerName)
            setUserLevel(userInfo.data.level)
            console.log(userInfo)
            const careerHighTier = await getCareerHighTier(userInfo.data.accessId)
            console.log(careerHighTier)
            setTier(getDivision(careerHighTier.data))
            const matchID = await getMatchID(userInfo.data.accessId) || [];
            console.log(matchID)

            const promises = matchID.data.map(getMatchData) || [];
            const temp = await Promise.all(promises);
            console.log("temp:", temp)
            let allMatches = []
            temp.map((match) => {
                allMatches.push(match.data[0])
            })
            setMatchData(allMatches)
            let possession = 0;
            let shootTotal = 0;
            let shootHeading = 0;
            let shootOutPenalty = 0;

            for (let i = 0; i < allMatches.length; i++){
                if(allMatches[i].matchInfo.length === 2){
                    if(allMatches[i]['matchInfo'][0]["nickname"] === managerName){
                        possession += allMatches[i]['matchInfo'][0]['matchDetail']['possession'];
                        shootTotal += allMatches[i]['matchInfo'][0]['shoot']['shootTotal'];
                        shootHeading += allMatches[i]['matchInfo'][0]['shoot']['shootHeading'];
                        shootOutPenalty += allMatches[i]['matchInfo'][0]['shoot']['shootOutPenalty'];
                    }else {
                        possession += allMatches[i]['matchInfo'][1]['matchDetail']['possession'];
                        shootTotal += allMatches[i]['matchInfo'][1]['shoot']['shootTotal'];
                        shootHeading += allMatches[i]['matchInfo'][1]['shoot']['shootHeading'];
                        shootOutPenalty += allMatches[i]['matchInfo'][1]['shoot']['shootOutPenalty'];
                    }
                }
            }

            setAveragePossession((possession/allMatches.length).toFixed(2));
            setAverageHeader((shootHeading/shootTotal*100).toFixed(2));
            setAverageLongShot((shootOutPenalty/shootTotal*100).toFixed(2));


        }
        getUserData()

    },[managerName])

    function getDivision(careerHighTier){
        switch(careerHighTier){
            case 1100:
                return "챌린지";
            case 2000:
                return "월드클래스 1";
            case 2100:
                return "월드클래스 2";
            case 2200:
                return "월드클래스 3";
            case 2300:
                return "프로 1";
            case 2400:
                return "프로 2";
            case 2500:
                return "프로 3";
            case 2600:
                return "세미프로 1";
            case 2700:
                return "세미프로 2";
            case 2800:
                return "세미프로 3";
            case 2900:
                return "아마추어 1";
            case 3000:
                return "아마추어 2";
            case 3100:
                return "아마추어 3";
            case 800:
                return "슈퍼 챔피언스";
            case 900:
                return "챔피언스";
            default:
                break;
        }
    }

    return (
        <div style={{position: 'relative', backgroundImage: "url(" + image1 + ")", backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <div>
                <Header style ={{position: 'absolute', top: 0}}/>
            </div>

            <div>
                <Manager nickname = {managerName} level = {UserLevel} tier = {Tier} averagePossession = {AveragePossession} averageHeader = {AverageHeader} averageLongShot = {AverageLongShot}/>
            </div>

            <div>
                <MatchTable  nickname = {managerName} matchData = {MatchData}/>
            </div>

            <div>
                <Footer style ={{position: 'absolute', bottom: 0}}/>
            </div>

        </div>
    );
}

export default GameRecordPage;
