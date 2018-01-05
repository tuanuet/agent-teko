import React, { Component } from 'react'

class Progress extends Component {
    render() {
        const { step } = this.props
        const value = step === 'product' ? 0 : step === 'customer' ? 1 : 2

        return <div className="row bs-wizard">
            <div className={`col-4 bs-wizard-step ${value > 0 ? `complete` : value === 0 ? `active` : `disabled`}`}>
              <div className="progress"><div className="progress-bar"></div></div>
              <span className="bs-wizard-dot"></span>
            </div>

            <div className={`col-4 bs-wizard-step ${value > 1 ? `complete` : value === 1 ? `active` : `disabled`}`}>
              <div className="progress"><div className="progress-bar"></div></div>
              <span className="bs-wizard-dot"></span>
            </div>

            <div className={`col-4 bs-wizard-step ${value > 2 ? `complete` : value === 2 ? `active` : `disabled`}`}>
              <div className="progress"><div className="progress-bar"></div></div>
              <span className="bs-wizard-dot"></span>
            </div>
        </div>
    }
}

export default Progress
