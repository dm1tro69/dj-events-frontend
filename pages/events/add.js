import Layout from "../../components/Layout";
import {useState} from "react";
import {useRouter} from "next/router";
import Link from 'next/link'
import styles from '../../styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {API_URL} from "../../config";

const AddPage = () => {
    const router = useRouter()
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault()

        const hasEmptyFields = Object.values(values).some((element) => element === "")
        if (hasEmptyFields){
            toast.error('Please fill in all fields')
        }
        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if (!res.ok){
            toast.error('Something went wrong')
        }else {
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }

        setValues({
            name: '',
            performers: '',
            venue: '',
            address: '',
            date: '',
            time: '',
            description: ''
        })
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})

    }
    return (
        <Layout>
            <Link href={'/events'}>Go Back</Link>
           <h1>Add Event</h1>
            <ToastContainer/>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input
                            type="text"
                            id={'name'}
                            name={'name'}
                            value={values.name}
                            onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="performers">Event Performers</label>
                        <input
                            type="text"
                            id={'performers'}
                            name={'performers'}
                            value={values.performers}
                            onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="venue">Event Venue</label>
                        <input
                            type="text"
                            id={'venue'}
                            name={'venue'}
                            value={values.venue}
                            onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="address">Event Address</label>
                        <input
                            type="text"
                            id={'address'}
                            name={'address'}
                            value={values.address}
                            onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="date">Event Date</label>
                        <input
                            type="date"
                            id={'date'}
                            name={'date'}
                            value={values.date}
                            onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="time">Event Time</label>
                        <input
                            type="text"
                            id={'time'}
                            name={'time'}
                            value={values.time}
                            onChange={handleInputChange}/>
                    </div>
                </div>
                <div>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        value={values.description}
                        onChange={handleInputChange}
                    />
                </div>
                <input type="submit" value={'Add Event'} className={'btn'}/>
            </form>
        </Layout>
    );
};

export default AddPage;
