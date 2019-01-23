import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { categories } from '../emoji-data';
import EmojiCategory from '../EmojiCategory';
import { Div } from './styled';

class EmojiList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            forcePreload: false
        }
    }

    shouldComponentUpdate(nextProps, nextState, { activeModifier }) {
        if (nextProps.modifiersSpread) {
            return false;
        }

        if (nextProps.filter || (!nextProps.filter && this.props.filter)) {
            return true;
        }

        if (this.props._emojiName !== nextProps._emojiName) {
            return true;
        }

        if (activeModifier !== this.context.activeModifier) {
            return true;
        }

        if (this.props.activeCategory !== nextProps.activeCategory) {
            return true;
        }

        return Object.keys(nextProps.seenCategories).length !== Object.keys(this.props.seenCategories).length;
    }

    componentDidMount() {
        this.setState({
            forcePreload: !('IntersectionObserver' in window)
        });
    }


    render() {
        const { filter, onScroll, seenCategories, preload, customCategoryNames, _emojiName, activeCategory } = this.props;
        return (
            <Div innerRef={(list) => this._list = list}
                filter={filter}
                onScroll={onScroll}>
                {categories.map((category, index) => {
                    const isCategorySeen = this.state.forcePreload || preload || seenCategories[category.name];

                    return (
                        <EmojiCategory category={category}
                            index={index}
                            key={index}
                            filter={filter}
                            customCategoryNames={customCategoryNames}
                            _emojiName={_emojiName}
                            isActiveCategory={activeCategory === category.name}
                            categorySeen={isCategorySeen}/>
                    );
                })}
            </Div>
        );
    }
}

EmojiList.propTypes = {
    filter: PropTypes.object,
    onScroll: PropTypes.func.isRequired,
    seenCategories: PropTypes.object.isRequired,
    preload: PropTypes.bool,
    _emojiName: PropTypes.object,
    modifiersSpread: PropTypes.bool,
    customCategoryNames: PropTypes.object,
    activeCategory: PropTypes.string
};

EmojiList.contextTypes = {
    activeModifier: PropTypes.string
};

export default EmojiList;