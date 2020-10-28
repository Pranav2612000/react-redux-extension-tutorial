import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useParams, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { notify } from '../store/notification/actions';
import { editLink } from '../store/linkList/actions';
import { SubmitButton } from '../components/common/SubmitButton';
import FormControl from '../components/NewLink/FormControl';

import { isValidURL, haveEnoughCharacters } from './../util/index';

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
                  break;
                }
        }
}

const EditLink = ({ editLink, notify, linkList }) => {
  sleep(2000);
  const { linkId } = useParams();
  const history = useHistory();
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    const [currentLink] = linkList.filter((link) => link.id === +linkId);

    if (currentLink) {
      setLinkName(currentLink.text);
      setLinkUrl(currentLink.url);
    } else {
      notify({
        text: 'Belirtilen id ile ilgili link bulunamadı!',
        hasError: true,
      });

      // Go index page
      history.push('/');
    }
  }, [linkId]);

  const isValidForm = () => {
    let formIsValid = true;
    let errorMessage = '';

    if (!isValidURL(linkUrl)) {
      formIsValid = false;
      errorMessage = 'INvalid URL';
    }

    if (!haveEnoughCharacters(linkName)) {
      formIsValid = false;
      errorMessage = 'Invalid URL';
    }

    if (!formIsValid) {
      notify({ text: errorMessage, hasError: true });
    }
    return formIsValid;
  };

  const editLinkHandler = (e) => {
    e.preventDefault();

    const newLink = {
      text: linkName,
      url: linkUrl,
    };

    if (!isValidForm()) {
      console.log('Valid Değil');
      return;
    }

    editLink(+linkId, newLink);

    const notifyText = linkName + ' edited.';
    notify({ text: notifyText });

    // Link ekledikten sonra ilk inputa focus ol
    document.querySelector('.m-linkForm__input').focus();
  };

  return (
    <form className="m-linkForm" action="POST" onSubmit={editLinkHandler}>
      <NavLink className="m-linkForm__navLink" to="/">
        &#8592; Return to List
      </NavLink>
      <h1 className="m-linkForm__header">Edit Link</h1>

      <FormControl
        id="link_name"
        labelName="Link Name:"
        type="text"
        placeholder="e.g. Alphabet"
        isRequired={true}
        changeHandler={(e) => setLinkName(e.target.value)}
        value={linkName}
      />

      <FormControl
        id="link_url"
        labelName="Link Url:"
        type="url"
        placeholder="e.g. http://abc.xyz"
        isRequired={true}
        changeHandler={(e) => setLinkUrl(e.target.value)}
        value={linkUrl}
      />

      <SubmitButton />
    </form>
  );
};

EditLink.propTypes = {
  editLink: PropTypes.func.isRequired,
  linkList: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    linkList: state.linkList,
    notification: state.notification,
  };
};

const mapDispatchToProps = {
  editLink,
  notify,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLink);
