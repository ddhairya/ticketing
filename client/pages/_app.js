import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../component/header'

const AppComponent = ({ Component, pageProps, data}) => {

    return (
        <div>
            <Header currentUser = {data} />
            <Component {...pageProps}/>
        </div>
    )

}


AppComponent.getInitialProps = async (appContext) => {

    const client = buildClient(appContext.ctx)
    const response = await client.get('/api/users/currentUser')
    let pageProps = {}
    if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }

    return {
        data : response.data.data,
        pageProps
    }

}

export default AppComponent