import React from "react";

const useForm = (pocetnaVrednost) => {

    const [formData, setFormData] = React.useState(pocetnaVrednost);

    const onChangeElement = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return [formData, onChangeElement];
}

export default useForm;