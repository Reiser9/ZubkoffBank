import React from 'react';

import './index.css';

import { Data } from '../../components/Icons';

import AdminItem from './AdminItem';
import DataField from './DataField';
import DataItem from './DataItem';

const CardBlock = ({data, id}) => {
    return (
        <AdminItem id={id + 1} title={data?.name}>
            <DataItem title="Данные" icon={<Data />} open>
                <div className="section-admin__items">
                    <DataField title="Лимит" value={`${data?.limit.toLocaleString()} ₽`} />
                    <DataField title="Изображение карты">
                        <div className="section-admin__card-img-inner left">
                            <img src={data?.img} alt="card" className="section-admin__card-img" />
                        </div>
                    </DataField>
                    <DataField title="Описание" value={data?.description} big />
                </div>
            </DataItem>
        </AdminItem>
    )
}

export default CardBlock;