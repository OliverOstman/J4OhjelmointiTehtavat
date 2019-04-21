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
                            <React.Fragment>
                                <Button color="secondary" component={Link} to={'single/' + tile.file_id}>
                                    View
                                </Button>
                                {props.edit &&
                                <React.Fragment>
                                    <Button color="secondary" component={Link} to={'modify/' + tile.file_id}>
                                        Modify
                                    </Button>
                                    <Button color="secondary" onClick={() => {
                                        props.deleteFile(tile.file_id);
                                    }}>
                                        Delete
                                    </Button>
                                </React.Fragment>
                                }
                            </React.Fragment>

                        }/>
                </GridListTile>
            ))}
        </GridList>
    );
};

ImageGrid.propTypes = {
    picArray: PropTypes.array,
    edit: PropTypes.bool,
    deleteFile: PropTypes.func,
};

export default ImageGrid;