/* eslint-disable */
const style = {
    fill: 'currentColor',
    overflow: 'hidden',
    verticalAlign: '-0.15em',
    width: '100%',
    height: '100%'
}
export default {
    name: 'SvgIcon',
    props: {
        iconName: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconClass () {
            return `#icon-${this.iconName}`
        }
    },
    render () {
        return (
            <svg class="icon" aria-hidden="true" style={ { ...style } }>
                <use xlinkHref={ this.iconClass } ></use>
            </svg>
        )
    }
}
