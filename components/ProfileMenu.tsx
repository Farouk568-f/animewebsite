import React from 'react';
import { motion } from 'framer-motion';
import { Profile } from '../types.ts';
import { PencilIcon, UserIcon, LogoutIcon } from '../constants.tsx';

interface ProfileMenuProps {
    activeProfile: Profile;
    profiles: Profile[];
    onProfileSelect: (profile: Profile) => void;
    onSignOut: () => void;
    onManageProfiles: () => void;
    onAccount: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ activeProfile, profiles, onProfileSelect, onSignOut, onManageProfiles, onAccount }) => {
    const otherProfiles = profiles.filter(p => p.id !== activeProfile.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-3 w-64 bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-lg shadow-2xl z-50 overflow-hidden"
        >
            <ul className="text-slate-300 p-2">
                {otherProfiles.map(profile => (
                     <li key={profile.id}>
                        <button onClick={() => onProfileSelect(profile)} className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-800 transition-colors text-left">
                           <img src={profile.avatarUrl} alt={profile.name} className="w-8 h-8 rounded-md object-cover flex-shrink-0" />
                           <span className="font-medium truncate">{profile.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="border-t border-slate-700 my-1 mx-2"></div>
            <ul className="text-slate-300 p-2">
                 <li>
                    <button onClick={onManageProfiles} className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-800 transition-colors text-left">
                       <PencilIcon className="w-6 h-6 text-slate-400 flex-shrink-0"/>
                       <span className="font-medium">Manage Profiles</span>
                    </button>
                </li>
                 <li>
                    <button onClick={onAccount} className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-800 transition-colors text-left">
                       <UserIcon className="w-6 h-6 text-slate-400 flex-shrink-0"/>
                       <span className="font-medium">Account</span>
                    </button>
                </li>
            </ul>
            <div className="border-t border-slate-700 my-1 mx-2"></div>
            <ul className="text-slate-300 p-2">
                <li>
                    <button onClick={onSignOut} className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-slate-800 transition-colors text-left">
                       <LogoutIcon className="w-6 h-6 text-slate-400 flex-shrink-0"/>
                       <span className="font-medium">Switch Profiles</span>
                    </button>
                </li>
            </ul>
        </motion.div>
    );
};

export default ProfileMenu;