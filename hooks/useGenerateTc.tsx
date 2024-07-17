'use client'

import { useEffect, useState } from 'react';
import { Client } from '@/types';
import { Template } from '@/types';

const useGenerateTc = () => {
    const [tc, setTc] = useState('');

    const [user, setUser] = useState<Client>(
        {
            first_name: '',
            last_name: '',
            email: '',
            company: '',
            company_description: '',
            role: '',
            experience: '',
            subscription: '',
            writing_profile: '',
            recruiting_profile: '',
            treasure_chest_link: '',
            prompt:''
        }
    );
    const [template, setTemplate] = useState<Template | null>(null);
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const generateTc = () => {
        const randomTc = Math.floor(10000000000 + Math.random() * 90000000000).toString();
        setTc(randomTc);
    };

    const openDialog = () => {
        console.log("opening")
        setShowDialog(true);
    };

    const closeDialog = () => {
        console.log("closing")
        setShowDialog(false);
    }

    useEffect(() => {
        console.log('showDialog', showDialog);
    }, [showDialog]);

    return { user, tc, showDialog, openDialog, closeDialog };
};

export default useGenerateTc;

