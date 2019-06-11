import React, { useContext, useState } from 'react';
import { CTX } from './Store';

import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2),
  },
  header: {
    padding: '0 20px 20px 20px',
    borderBottom: '1px solid lightgrey',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  topicsSection: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid lightgrey',
  },
  chatSection: {
    width: '70%',
    height: '300px',
    padding: '20px',
  },
  messageCompositionSection: {
    width: '85%',
  },
  submitMessageSection: {
    width: '15%',
  },
  bottomSection: {
    padding: '20px',
    display: 'flex',
    borderTop: '1px solid lightgrey',
    alignItems: 'center',
  },
  chip: {
    marginRight: '10px',
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  const [composedMessageValue, setComposedMessageValue] = useState('');
  const { messagesByTopic, sendChatAction } = useContext(CTX);
  const topics = Object.keys(messagesByTopic);

  const [activeTopic, setActiveTopic] = useState(topics[0])

  const messageObjects = messagesByTopic[activeTopic];

  return <Paper className={classes.root}>
    <div className={classes.header}>
      <Typography variant="h4" component="h4">
        VChat
      </Typography>
      <Typography variant="h5" component="h5">
        #{activeTopic}
      </Typography>
    </div>
    
    <div className={classes.flex}>
      <div className={classes.topicsSection}>
        <List>
          { 
            topics.map(topic => 
              <ListItem  selected={activeTopic === topic} key={topic} button onClick={() => setActiveTopic(topic)}>
                <ListItemText primary={`#${topic}`} />
              </ListItem>
            )
          }
        </List>
      </div>
      <div className={classes.chatSection}> 
        { 
          messageObjects.map((messageObject, index) => 
            <div className={classes.flex} key={index} style={{ marginBottom: '10px' }}>
              <Chip label={messageObject.author.name} className={classes.chip} />
              <Typography>{messageObject.message.content}</Typography> 
            </div>
          )
        } 
      </div>
    </div>
    <div className={classes.bottomSection}>
        <TextField
          label="Message"
          className={classes.messageCompositionSection}
          margin="normal"
          value={composedMessageValue}
          onChange={e => setComposedMessageValue(e.target.value)}
        />
      <div className={classes.submitMessageSection}>
        <Button 
          onClick={() => {
            sendChatAction({ 
              topic: activeTopic, 
              author: { name: 'Victor Kmita' },
              message: { content: composedMessageValue },
            });
            setComposedMessageValue('')
          }}
          variant="contained" 
          color="primary" 
          className={classes.button}
        >
          Send
        </Button>
      </div>
    </div>
  </Paper>
}