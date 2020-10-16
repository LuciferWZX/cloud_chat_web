import React, { FC } from 'react';

import ContactSearchBar from '@/pages/message/ContactSearchBar';
import ContactList from '@/pages/message/ContactList';
import { ContactBox } from '@/pages/message/style';

const ContactContainer: FC = () => {
  return (
    <ContactBox>
      <ContactSearchBar />
      <ContactList />
    </ContactBox>
  );
};
export default ContactContainer;
