const express = require("express");
const asyncify = require('express-asyncify');
const router = asyncify(express.Router());
const axios = require("axios");
const key = process.env.key
    // || require("../config/key").key;
// const key = process.env.key
const baseURL = "https://api.nexon.co.kr/fifaonline4/v1.0"


router.get("/userName=search?:managerName",  async (req, res) => {
    const managerName = encodeURI(req.query.managerName);
    const managerInfo = [];
    await axios.get(`${baseURL}/users?nickname=${managerName}`, {
        headers: {
            'Authorization': key
        }
    }).then((res) => {
        managerInfo.push(res.data);
    }).catch((err) => res.json({ err }));

    const {
        accessId,
        nickname,
        level
    } = managerInfo[0];

    res.json({
        accessId,
        nickname,
        level
    });
});

router.get("/searchTier?:accessId",  async (req, res) => {
    const managerAccessId = req.query.accessId
    let tier = [];
    await axios.get(`${baseURL}/users/${managerAccessId}/maxdivision`, {
        headers: {
            'Authorization': key
        }
    }).then((res) => {
        tier= res.data;
    }).catch((err) => res.json({ err }));

    res.json(tier[0]['division'])
});




router.get("/getMatchID?",  async (req, res) => {

    const managerAccessId = req.query.accessId
    const gameNumber = req.query.gameNumber


    let matchID = [];
    await axios.get(`${baseURL}/users/${managerAccessId}/matches?matchtype=50&offset=0&limit=${gameNumber}`, {
        headers: {
            'Authorization': key
        }
    }).then((res) => {
        matchID= res.data
    }).catch((err) => res.json({ err }));
    // console.log(matchID)
    res.json(matchID)
});


//
// router.get("/getMatchID?:accessId/",  async (req, res) => {
//     const managerAccessId = req.query.accessId
//     // const gameNumber = req.query.gameNumber
//
//     // console.log(gameNumber)
//
//     let matchID = [];
//     await axios.get(`${baseURL}/users/${managerAccessId}/matches?matchtype=50&offset=0&limit=10`, {
//         headers: {
//             'Authorization': key
//         }
//     }).then((res) => {
//         matchID= res.data
//     }).catch((err) => res.json({ err }));
//     // console.log(matchID)
//     res.json(matchID)
// });



router.get("/getMatchData?:matchID",  async (req, res) => {
    const managerMatchID = req.query.matchID
    let matchData = [];
    await axios.get(`${baseURL}/matches/${managerMatchID}`, {
        headers: {
            'Authorization': key
        }
    }).then((res) => {
        matchData.push(res.data);
    }).catch((err) => res.json({ err }));
    // console.log("matchData: "+matchData)
    res.json(matchData)
});


module.exports = router;