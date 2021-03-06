const style = {
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        display: 'block',
        cursor: 'pointer'
    }
}
export default {
    name: 'Avatar',
    functional: true,
    render (h, ctx) {
        const { props, data } = ctx
        return (
            <div style={ { ...style.avatar } } class={ data.staticClass }>
                <img src={ props.src } alt="头像" style={ { ...style.avatar } }/>
            </div>
        )
    },
}
