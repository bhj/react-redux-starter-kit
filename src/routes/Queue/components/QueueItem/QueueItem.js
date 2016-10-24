import React from 'react'
import classes from './QueueItem.css'

export const QueueItem = (props) => (
  <div className={classes.container} style={{backgroundSize: props.pctPlayed+'% 100%'}}>
    <div className={classes.wait}>
      {props.isActive ? 'now' : props.wait}
    </div>

    <div className={classes.primary}>
      <div className={classes.user}>{props.userName}</div>
      <div className={classes.title}>{props.artist} - {props.title}</div>
    </div>

    {props.hasErrors &&
      <div onClick={props.onErrorInfoClick} className={classes.errorInfo}>
        <i className='material-icons'>info_outline</i>
      </div>
    }
    <div className={classes.star}>
      <i className='material-icons'>
        {props.isStarred ? 'star' : 'star_border'}
      </i>
    </div>
    {props.canSkip &&
      <div onClick={props.onSkipClick} className={classes.skip}>
        <i className='material-icons'>skip_next</i>
      </div>
    }
    {props.canRemove &&
      <div onClick={props.onRemoveClick} className={classes.remove}>
        <i className='material-icons'>clear</i>
      </div>
    }
  </div>
)

QueueItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  artist: React.PropTypes.string.isRequired,
  userName: React.PropTypes.string.isRequired,
  hasErrors: React.PropTypes.bool.isRequired,
  canSkip: React.PropTypes.bool.isRequired,
  onSkipClick: React.PropTypes.func.isRequired,
  canRemove: React.PropTypes.bool.isRequired,
  onRemoveClick: React.PropTypes.func.isRequired,
  onErrorInfoClick: React.PropTypes.func.isRequired,
}

export default QueueItem