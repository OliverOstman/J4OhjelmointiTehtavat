import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {GridList, GridListTile, GridListTileBar, Button,} from '@material-ui/core';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ImageGrid = (props) => {
    return (
        <GridList style={{margin: 0}}>
            {props.picArray.map(tile => (
                <GridListTile key={tile.file_id} style={{height: 260}}>
                    {
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
                        subtitle={tile.description}
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