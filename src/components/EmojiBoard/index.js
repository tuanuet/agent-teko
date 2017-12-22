import React, { Component } from 'react'
import emos from 'emoji-datasource-messenger'

class Emoji extends Component {
    sendEmoji = () => {
        const { smiley } = this.props
        this.props.insertEmoji(smiley)
    }
    render() {
        const { smiley: { sheet_x, sheet_y } } = this.props
        const style = {
            backgroundImage: `url(images/emoji-32.png)`,
            width: 34,
            height: 34,
            border: 'none',
            display: 'inline-block',
            margin: 5
        }

        return <div className="clickable" style={{
            ...style,
            backgroundPosition: `-${sheet_x * 34}px -${sheet_y * 34}px`
        }} onClick={this.sendEmoji}></div>
    }
}

class EmojiBoard extends Component {
    insertEmoji = smiley => {
        const { text, unified, texts } = smiley
        const codePoints = unified.split('-').map(u => `0x${u}`)
        const emoji = String.fromCodePoint(...codePoints)
        this.props.insertEmoji(emoji)
    }
    render() {
        const smileys = emos.filter(({category, has_img_messenger, text, obsoletes}, idx) => {
            return category === 'Smileys & People' && has_img_messenger && !obsoletes
        }).sort((a, b) => a.sort_order - b.sort_order)
        const { toggleEmojiBoard } = this.props

        return <div className="emoji-board" onBlur={toggleEmojiBoard} tabIndex={0}>
            { smileys.map(smiley => {
                const { sheet_x, sheet_y, unified, text, texts } = smiley
                return <Emoji key={unified}
                    smiley={smiley}
                    insertEmoji={this.insertEmoji} />
            }) }
        </div>
    }
}

export default EmojiBoard
