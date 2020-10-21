import React, { Component } from 'react'
import axios from 'axios'

import './Home.css'

import data from '../components/dashboard/roomNames.json'

class Prompt extends Component {

    state = {
        data: ""
    }
    
    render() {
        // const {  } = this.props;
        return this.props.prompt ? <div id="prompt">

            <div className="container">
        
                <input placeholder="ENTER HERE" onChange={(e) => {
                    this.setState({
                        data: e.target.value
                    })
                }}></input>
        
                <div>
                    <button onClick={() => { this.props.submit(this.state.data) }}>OK</button>
                    <button onClick={this.props.hide}>CANCEL</button>
                </div>

            </div>
    
        </div> : <></>
        
    }

}

export default class Home extends Component {

    state = {
        curTime: '00:00:00',
        selected: [],
        logs: [],
        prompt: false,
        type: null,
        opacity: 0
    }

    componentDidMount() {
        this.getLogs()
        this.setTime()
        setInterval(() => {
            this.setTime()
        }, 1000)
        window.addEventListener('load', () => {
            this.setState({
                opacity: 1
            })
        });
    }

    setTime = () => {
        const d = new Date();
        let datetext = d.toTimeString();
        datetext = datetext.split(' ')[0];
        this.setState({
            curTime : datetext
        })
    }

    getLogs = () => {
        axios.get(`/api/v1/admin/eventLog`).then((res) => {
            // console.log(res.data)
            
            if (res.data?.status == 'success') {
                const obj = res.data.data
                const arr = Object.keys(obj).map((key) => obj[key])
                console.log(arr)
                this.setState({
                    logs: arr
                })
            } 
            
        })
    }

    act = async (type) => {
        console.log(type)

        if (this.state.selected.length) {

            if (type == 'pre' || type == 'post') {
                await this.setState({
                    type: type,
                })
                this.submit('')
            } else {
                this.setState({
                    prompt: true,
                    type: type,
                })
            }
        } else {
            alert('Please select atleast one room!')
        }

    }

    submit = (value=null) => {
        axios
        .post(`/api/v1/admin/conferenceRoom`, this.state.selected.map(s => {
            return {
                name: s,
                event: this.state.type,
                data: value
            }
        }))
        .then((res) => {
          console.log(res)
          // console.log(res.data)
        //   this.props.handleRoomStatusUpdate(this.state.currentStatus)
        }).finally(() => {
            this.setState({
                prompt: false,
                type: null
            })
            this.getLogs()
        })
    }

    render() {

        const rooms = data.conferenceRoomNames
        let color = 'bg-beige'

        return (
            <div id="app" style={{ minWidth: 1200 }}>
                
                <Prompt prompt={this.state.prompt} submit={this.submit} hide={() => {this.setState({prompt: false})}}/>

                <div className="f fc" style={{ padding: '0px 25px 25px 25px', height: '100%', opacity: this.state.opacity }}>
                    <div className="b f btn rel" style={{ height: 125,
                    
                        display: 'grid',
                        gridTemplateColumns: 'repeat(100, 1fr)',
                        gridGap: '8px'

                    }}>
                        <div id="primary-section" style={{ 
                            display: 'flex'
                         }}>
                            <div className="c-orange" style={{ fontSize: 65, marginLeft: 30 }}>
                                HABITAT CONTROL
                            </div>
                            <div className="c-purple f c" style={{ flexGrow: 1, fontSize: 50 }}>
                                STAR DATE 2701.16 {this.state.curTime}
                            </div>
                            <div className="c-orange">
                                {/* <Button></Button> */}
                            </div>
                        </div>
                        <div className="b btn f fc" style={{ flex: '1 1 100%', gridColumn: 'span 48' }}>
                            <div className="w h bb bg-purple b" style={{ height: 10}}></div>
                            <div className="w h bg-blue rbl"></div>
                        </div>
                        <div className="b btn bg-orange" style={{ gridColumn: 'span 4' }}></div>
                        <div className="b btn bg-purple" style={{ gridColumn: 'span 20' }}></div>
                        <div className="b btn bg-purple" style={{ gridColumn: 'span 23' }}></div>
                        <div className="b btn bg-red-brown" style={{ gridColumn: 'span 5' }}></div>
                    </div>
                    
                    <div className="b f fc rel" style={{ height: 'calc(100% - 125px)', marginBottom: 0 }}>
                        <div id="secondary-section">

                            <div className="f fr h" style={{ overflow: 'hidden' }}>

                                <div className="w" style={{ overflowY: 'scroll', marginRight: 15 }}>
                           
                                    <div className="" style={{ 
                                        flex: '1',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat( auto-fill, minmax(230px, 1fr) )',
                                        // gridTemplateRows: 'auto',
                                        // gridAutoColumns: 'min-content max-content auto',
                                        // gridAutoRows: 'auto',
                                        gridGap: '8px',
                                        marginRight: 15
                                    }}>
                                        
                                        { rooms.sort().map(room => {

                                            color = 'bg-beige'
                                            const doSelect = this.state.selected.includes(room)

                                            return (
                                                <div className={ `room f c ${color} ${doSelect && 'selected'}` } style={{ 
                                                    fontSize: 35,
                                                    borderRadius: 10,
                                                    // height: '100%'
                                                }}
                                                onClick={ () => {
                                                    let newSelected = this.state.selected.includes(room) ? this.state.selected.filter(s => s != room) : [...this.state.selected, room]
                                                    this.setState({
                                                        selected: newSelected
                                                    })
                                                } }>
                                                    <div style={{ padding: 5 }}>
                                                        { room }
                                                    </div>
                                                </div>
                                            )
                                        }) }
                                        
                                        {/* 
                                        <div className={ `f c ${color}` } style={{ 
                                            fontSize: 35,
                                            borderRadius: 10,
                                            // height: '100%',
                                            gridColumn: 'span 4'
                                        }}>
                                            <div style={{ padding: 5 }}>

                                            </div>
                                        </div> */}

                                    </div>

                                </div>

                                <div id="event">   
                                    <div style={{  }}>
                                        <img src="/anim.gif"></img>
                                    </div>
                                    <div className="c-orange" style={{ fontSize: 50 }}>
                                        EVENT LOGS
                                    </div>
                                    <div id="logs">
                                        { this.state.logs.length && this.state.logs.reverse().map(log => {

                                            console.log(log)


                                            const date = (new Date(log.time).toLocaleTimeString()).slice(0, 8)

                                            let event = log.event
                                            if (event == 'pre') event = 'PRE EVENT'
                                            if (event == 'live') event = 'LIVESTREAM'
                                            if (event == 'image') event = 'STATIC IMAGE'
                                            if (event == 'text') event = 'CUSTOM TEXT'
                                            if (event == 'redirect') event = 'REDIRECT '
                                            if (event == 'post') event = 'WATCHPARTY'

                                            return (
                                                <div className={`log ${log?.data && 'ptr'}`} onClick={()=>{ log?.data && prompt('', log.data) }}>
                                                    { `${date} - ${log.name} - ` }<span>{event}</span>
                                                </div>
                                            )
                                        }) }
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="b f fr g2 bb" style={{ borderLeft: 0, 
                        
                            display: 'grid',
                            gridTemplateColumns: 'repeat(100, 1fr)',
                            gridGap: '8px'

                        }}>
                            <div className="b bg-red-brown rtl" style={{ gridColumn: 'span 34' }}></div>
                            <div className="b bg-grey-blue" style={{ gridColumn: 'span 14' }}></div>
                            <div className="b bg-orange" style={{ gridColumn: 'span 4' }}></div>
                            <div className="b bg-beige" style={{ height: 15, gridColumn: 'span 16' }}></div>
                            <div className="b bg-orange" style={{ gridColumn: 'span 7' }}></div>
                            <div className="b bg-purple sel" style={{ gridColumn: 'span 9' }} onClick={ () => { this.setState({
                                selected: rooms
                            }) } }>
                                <span>SELECT ALL</span>
                            </div>
                            <div className="b bg-purple sel" style={{ gridColumn: 'span 11' }} onClick={ () => { this.setState({
                                selected: []
                            }) } }>
                                <span>UNSELECT ALL</span>
                            </div>
                            <div className="b bg-red-brown" style={{ gridColumn: 'span 5' }}></div>
                        </div>
                        <div className="action b bg-orange g1" onClick={() => {this.act('pre')}}><span>PRE EVENT</span></div>
                        <div className="action b bg-red-brown g1" onClick={() => {this.act('live')}}><span>LIVESTREAM</span></div>
                        <div className="action b bg-beige g1" onClick={() => {this.act('image')}}><span>STATIC IMAGE</span></div>
                        <div className="action b bg-beige g1" onClick={() => {this.act('text')}}><span>CUSTOM TEXT</span></div>
                        <div className="action b bg-beige g1" onClick={() => {this.act('redirect')}}><span>REDIRECT TO</span></div>
                        <div className="action b bg-beige g1"><span>OPEN ROOM</span></div>
                        <div className="action b bg-orange g1" onClick={() => {this.act('post')}}><span>WATCHPARTY</span></div>
                        <div className="b f fr g2" style={{ 
                            display: 'grid',
                            gridTemplateColumns: 'repeat(100, 1fr)',
                            gridGap: '8px'
                        }}>
                            <div className="b bg-red-brown rbl" style={{ gridColumn: 'span 37' }}></div>
                            <div className="b bg-orange" style={{ gridColumn: 'span 8' }}></div>
                            <div className="b bg-beige" style={{ gridColumn: 'span 13' }}></div>
                            <div className="b bg-blue" style={{ 
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                gridColumn: 'span 30',
                                lineHeight: 0.8
                            }}>
                                <span style={{ paddingRight: 10 }}>
                                    192 168 0 3
                                </span>
                            </div>
                            <div className="b bg-beige" style={{ 
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                gridColumn: 'span 12',
                                lineHeight: 0.9
                            }}>
                                <span style={{ paddingRight: 10 }}>
                                    github:kazilotus
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
