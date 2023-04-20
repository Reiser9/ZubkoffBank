import React from 'react';

import './index.css';

import { Data } from '../../components/Icons';

import AdminItem from './AdminItem';
import DataField from './DataField';
import DataItem from './DataItem';

const CardBlock = ({data, id}) => {
    const {name, limit, img, description} = data;

    return (
        <AdminItem id={id + 1} title={name}>
            <DataItem title="Данные" icon={<Data />}>
                <div className="section-admin__items">
                    <DataField title="Лимит" value={`${limit.toLocaleString()} ₽`} />
                    <DataField title="Изображение карты">
                        <div className="section-admin__card-img-inner">
                            <img src={img} alt="card" className="section-admin__card-img" />
                        </div>
                    </DataField>
                    <DataField title="Описание" value={description} big />
                </div>
            </DataItem>
        </AdminItem>
    )
}

export default CardBlock;