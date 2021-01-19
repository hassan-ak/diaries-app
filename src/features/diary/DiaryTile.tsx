// Imports
// React Imports
import React, { FC, useState } from 'react';
// Routers Imports
import { Link } from 'react-router-dom';
// Materail UI Imports
import { Button } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// Interface Imports
import { Diary } from '../../interfaces/diary.interface';
// Api Imports
import http from '../../services/api';
// Reducer and store imports
import { useAppDispatch } from '../../store';
import { updateDiary } from './diariesSlice';
import { setCanEdit, setActiveDiaryId, setCurrentlyEditing } from '../entry/editorSlice';
// Utill imports
import { showAlert } from '../../util';

// Props type declaration
interface Props {
    diary: Diary;
}

// Diaries List / entry
const DiaryTile: FC<Props> = (props) => {
    // get data from store
    const dispatch = useAppDispatch();
    const [diary, setDiary] = useState(props.diary);
    const [isEditing, setIsEditing] = useState(false);
    // Total Number of entries and types
    const totalEntries = props.diary?.entryIds?.length;
    const type = props.diary.type

    // Function to save changes
    const saveChanges = () => {
        http
            .put<Diary, Diary>(`/diaries/${diary.id}`, diary)
            .then((diary) => {
                if (diary) {
                    dispatch(updateDiary(diary));
                    showAlert('Saved!', 'success');
                }
            })
            .finally(() => {
                setIsEditing(false);
            });
    };

    return (
        <div className="diary-tile">
            <h3 className="title" title="Click to edit" onClick={() => setIsEditing(true)}>
                {isEditing ? (
                    <input value={diary.title} onChange={(e) => { setDiary({ ...diary, title: e.target.value, }); }} onKeyUp={(e) => { if (e.key === 'Enter') { saveChanges(); } }} />
                ) : (
                        <span>{diary.title}</span>
                    )}
            </h3>
            <p className="subtitle">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
            <p className="subtitle">{totalEntries ?? '0'} saved entries</p>
            <div className="tilebtnDiv">
                <Button
                    style={{ color: "white" }}
                    disableRipple
                    onClick={() => {
                        dispatch(setCanEdit(true));
                        dispatch(setActiveDiaryId(diary.id as string));
                        dispatch(setCurrentlyEditing(null));
                    }}
                >
                    <AddCircleOutlineIcon />
                </Button>
                <Link to={`diary/${diary.id}`}>
                    <Button
                        style={{ color: "white" }}
                        disableRipple
                        aria-label="View all Entries"
                    >
                        <VisibilityIcon />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default DiaryTile;