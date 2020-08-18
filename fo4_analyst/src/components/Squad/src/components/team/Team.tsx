import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import PlayerView, { Player } from "./player/Player";

import "./Team.scss";


export type Squad = {
    gk?: Player;
    sw?: Player;
    df?: Player[];
    wbdm?: Player[];
    cm?: Player[];
    cam?: Player[];
    wf?: Player[];
    fw?: Player[];
};

export type Team = {
    color?: string;
    squad: Squad;
};

export interface TeamViewProps {
    away?: boolean;
    team: Team;
}

interface TeamViewState {

}

class TeamView extends Component<TeamViewProps, TeamViewState> {

    static teamShape = PropTypes.shape({
        color: PropTypes.string,
        squad: PropTypes.shape({
            gk: PlayerView.playerShape,
            sw: PlayerView.playerShape,
            df: PropTypes.arrayOf(PlayerView.playerShape),
            wbdm: PropTypes.arrayOf(PlayerView.playerShape),
            cm: PropTypes.arrayOf(PlayerView.playerShape),
            cam: PropTypes.arrayOf(PlayerView.playerShape),
            wf: PropTypes.arrayOf(PlayerView.playerShape),
            fw: PropTypes.arrayOf(PlayerView.playerShape)
        }).isRequired
    });

    render() {

        const { away } = this.props;
        const { gk, sw, df, wbdm, cm, cam, wf, fw } = this.props.team.squad;

        return (
            <div className={ classNames("team", { "away": away }) }>

                { gk && <div className="goalkeeper">

                    <PlayerView player={ gk } />

                </div> }


                <div className="lines">

                    { sw && <div className="line">
                        <PlayerView player={sw}/>
                    </div>}


                    { df && <div className="line">

                        { df.map((df, i) => <PlayerView player={ df } key={ i } />) }

                    </div> }

                    <div className = "lines"/>

                    { wbdm && <div className="line">

                        { wbdm.map((wbdm, i) => <PlayerView player={ wbdm } key={ i } />) }

                    </div> }

                    { cm && <div className="line">

                        { cm.map((cm, i) => <PlayerView player={ cm } key={ i } />) }

                    </div> }

                    { cam && <div className="line">

                        { cam.map((cam, i) => <PlayerView player={ cam } key={ i } />) }

                    </div> }


                    { wf && <div className="line">

                        { wf.map((wf, i) => <PlayerView player={ wf } key={ i } />) }

                    </div> }

                    { fw && <div className="line">

                        { fw.map((fw, i) => <PlayerView player={ fw } key={ i } />) }

                    </div> }

                </div>

            </div>
        );
    }
}

export default TeamView;
