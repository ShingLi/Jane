const style = {
    avatar: {
        cursor: 'pointer',
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        display: 'block',
    }
}

export default {
    name: 'Avatar',
    functional: true,
    render (h, ctx) {
        const { props, data } = ctx
        return (
            <div style={ { ...style.avatar } } class={ data.staticClass }>
                <img src={ props.src } style={ { ...style.avatar, ...style.img } }/>
            </div>
        )
    },
}
