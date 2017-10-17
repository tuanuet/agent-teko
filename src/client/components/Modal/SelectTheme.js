import React from 'react'
export default function ({changeTheme}) {
    return (
        <div className="lio-modal show" id="selectTheme" data-toggle="modal">
            <div className="body">
                <div className="title">Select your theme</div>
                <div className="list-theme">
                    <button className="black" onClick={changeTheme}/>
                    <button className="blue" onClick={changeTheme}/>
                    <button className="pink" onClick={changeTheme}/>
                </div>
            </div>
        </div>
    )
}