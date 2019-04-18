import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {GridList, GridListTile, GridListTileBar, Button,} from '@material-ui/core';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const getDescription = (text) => {
    const pattern = '\\[d\\]((.|[\\r\\n])*?)\\[\\/d\\]';
    const re = new RegExp(pattern);
    try {
        return re.exec(text)[1];
    } catch (e) {
        return text;
    }
};

const getFilters = (text) => {
    const pattern = '\\[f\\](.*?)\\[\\/f\\]';
    const re = new RegExp(pattern);
    /*
    if (re.exec(text) !== null) {
        return JSON.parse(re.exec(text)[1]);
    } else {
        return undefined;
    } */
    try {
        return JSON.parse(re.exec(text)[1]);
    } catch (e) {
        return undefined;
    }
};

const ImageGrid = (props) => {
    return (
        <GridList style={{margin: 0}}>
            {props.picArray.map(tile => (
                <GridListTile key={tile.file_id} style={{height: 260}}>
                    {
                        (tile.thumbnails !== undefined && getFilters(tile.description) !== undefined
                            &&
                            <img src={mediaUrl + tile.thumbnails.w160} alt={tile.title}
                                 style={{filter: `brightness(${getFilters(tile.description).brightness}%)
                             contrast(${getFilters(tile.description).contrast}%)
                             sepia(${getFilters(tile.description).warmth}%)
                             saturate(${getFilters(tile.description).saturation}%)`}}
                            />)
                        ||
                        (tile.thumbnails !== undefined
                        &&
                        <img src={mediaUrl + tile.thumbnails.w160} alt={tile.title}/> )
                        ||
                        (tile.screenshot !== undefined
                        &&
                        <img src={mediaUrl + tile.screenshot} alt={tile.title}/> )
                        ||
                        <img src={"http://placekitten.com/300/300"} alt={tile.title}/>
                    }
                    <GridListTileBar
                        title={tile.title}
                        subtitle={getDescription(tile.description)}
                        actionIcon={
                            <Button color="secondary" component={Link} to={'single/' + tile.file_id}>
                            View
                            </Button>
                        }/>
                </GridListTile>
            ))}
        </GridList>
    );
};

ImageGrid.propTypes = {
    picArray: PropTypes.array,
};

export default ImageGrid;

/*
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
} from '@material-ui/core';
import {OpenWith} from '@material-ui/icons';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ImageGrid = (props) => {
  return (
      <GridList>
        <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
          <ListSubheader component="div">Files</ListSubheader>
        </GridListTile>
        {props.picArray.map(tile => (
            <GridListTile key={tile.file_id}>
              {(tile.thumbnails !== undefined
                  &&
                  <img src={mediaUrl + tile.thumbnails.w160} alt={tile.title}/>)
              ||
              (tile.screenshot !== undefined
                  &&
                  <img src={mediaUrl + tile.screenshot} alt={tile.title}/>)
              ||
              <img src="http://placekitten.com/400/400" alt={tile.title}/>
              }
              <GridListTileBar
                  title={tile.title}
                  actionIcon={
                    <React.Fragment>
                      <IconButton component={Link}
                                  to={'single/' + tile.file_id}>
                        <OpenWith color="secondary"/>
                      </IconButton>
                      {props.edit &&
                      <React.Fragment>
                        <IconButton component={Link}
                                    to={'modify/' + tile.file_id}>
                          <span style={{color: '#fff'}}>Modify</span>
                        </IconButton>
                        <IconButton onClick={() => {
                          props.deleteFile(tile.file_id);
                        }}>
                          <span style={{color: '#fff'}}>Delete</span>
                        </IconButton>
                      </React.Fragment>
                      }
                    </React.Fragment>
                  }
              />
            </GridListTile>
        ))}
      </GridList>
  );
};
 */