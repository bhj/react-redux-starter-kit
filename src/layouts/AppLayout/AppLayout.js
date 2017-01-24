import React from 'react'
import Header from 'components/Header'
import Navigation from 'components/Navigation'
import { SkyLightStateless } from 'react-skylight'
import classes from './AppLayout.css'

export const AppLayout = (props) => (
  <div>
    <div className={classes.header}>
      <Header
        title={props.title}
        isAdmin={props.isAdmin}
        onHeight={props.setHeaderHeight}
      />
    </div>

    <div className={classes.viewport} style={{width: props.browserWidth, height: props.browserHeight}}>
      {props.children({
        // ready to reheat-n-serve as style
        paddingTop: props.headerHeight,
        paddingBottom: props.footerHeight,
      })}
    </div>

    <div className={classes.nav}>
      <Navigation onHeight={props.setFooterHeight}/>
    </div>

    <SkyLightStateless
      isVisible={props.errorMessage !== null}
      onCloseClicked={props.clearErrorMessage}
      onOverlayClicked={props.clearErrorMessage}
      title="Oops"
      dialogStyles={{
        width: '80%',
        height: 'auto',
        left: '10%',
        marginLeft: '0'}}
    >
      {props.errorMessage}
      <br/><br/><br/>
      <button className="button wide raised" onClick={props.clearErrorMessage}>Dismiss</button>
    </SkyLightStateless>
  </div>
)

AppLayout.propTypes = {
  isAdmin: React.PropTypes.bool,
  errorMessage: React.PropTypes.string,
  browserWidth: React.PropTypes.number,
  browserHeight: React.PropTypes.number,
  headerHeight: React.PropTypes.number,
  footerHeight: React.PropTypes.number,
  // actions
  setHeaderHeight: React.PropTypes.func,
  setFooterHeight: React.PropTypes.func,
  clearErrorMessage: React.PropTypes.func,
}

export default AppLayout