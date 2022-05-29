import React, { Component } from "react";
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import s from './Searchbar.module.css';

class Searchbar extends Component{
    state = {
        topic: '',
    };

    handleTopicChange = e => {
        this.setState({
            topic: e.currentTarget.value.toLowerCase()
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { topic } = this.state;
        if (topic.trim() === '') {
            Notiflix.Notify.info('Put a topic you are looking for');
            return;
        };
        
        this.props.onSubmit(topic);
        this.setState({ topic: '' });
    };

    render() {
        const { topic } = this.state;
        const { handleTopicChange, handleSubmit } = this;
        return (
            <header className={s.searchbar}>
                <form className={s.form} onSubmit={handleSubmit}>
                    <button type="submit" className={s.button}>
                        <span className={s.buttonLabel}><BsSearch  fill="#3f51b5" /></span>
                    </button>
                    <input
                        className={s.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={topic}
                        onChange={handleTopicChange}
                    />
                </form>
            </header>
        );
    };
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;