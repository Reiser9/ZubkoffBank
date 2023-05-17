import React from 'react';

import './index.css';

import useNotify from '../../hooks/useNotify';
import useAdmin from '../../hooks/useAdmin';

import Input from '../../components/Input';
import File from '../../components/File';
import Button from '../../components/Button';
import SliderInput from '../../components/SliderInput';

const AdminCreateType = ({setActive}) => {
    const [image, setImage] = React.useState("");
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [limit, setLimit] = React.useState("");

    const {alertNotify} = useNotify();
    const {createTypeCard} = useAdmin();

    const createType = async () => {
        if(!image){
            return alertNotify("Ошибка", "Выберите изображение карты!", "warn");
        }
        if(!name){
            return alertNotify("Ошибка", "Введите название карты!", "warn");
        }
        if(!description){
            return alertNotify("Ошибка", "Введите описание карты!", "warn");
        }
        if(!limit){
            return alertNotify("Ошибка", "Введите лимит карты!", "warn");
        }

        let formData = new FormData();

        formData.append("img", image);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("limit", limit);

        createTypeCard(formData, () => setActive("cards"));
    }

    return (
        <div className="admin__create--type--inner">
            <h2 className="admin__title">Создание типа карт</h2>

            <div className="admin__create--type--content">
                <File id="createType" setValue={setImage} title="Изображение" />

                <Input value={name} setValue={setName} title="Название" />

                <Input value={description} setValue={setDescription} title="Описание" />

                <SliderInput title="Лимит" value={limit} setValue={setLimit} />

                <Button className="admin__create--type--button" onClick={createType}>Создать</Button>
            </div>
        </div>
    )
}

export default AdminCreateType;