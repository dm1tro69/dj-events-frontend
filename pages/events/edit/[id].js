import {useState} from "react";
import {useRouter} from "next/router";
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../../styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Layout from "../../../components/Layout";
import {API_URL} from "../../../config";
import {formatDateForInput} from '../../../utils/formatData'
import {FaImage} from "react-icons/fa";
import Modal from "../../../components/Modal";
import ImageUpload from "../../../components/ImageUpload";

const EditEventPage = ({evt}) => {
    const router = useRouter()
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: formatDateForInput(evt.date),
        time: evt.time,
        description: evt.description
    })

    const [imagePreview, setImagePreview] = useState(evt.image? evt.image.formats.thumbnail.url: null)

    const [showModal, setShowModal] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const hasEmptyFields = Object.values(values).some((element) => element === "")
        if (hasEmptyFields){
            toast.error('Please fill in all fields')
        }
        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'PUT',
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
    const imageUploaded = async (e) => {
         const res = await fetch(`${API_URL}/events/${evt.id}}`)
        const data = await res.json()
        setImagePreview(data.image.formats.thubnail.url)
        setShowModal(false)
    }
    return (
        <Layout>
            <Link href={'/events'}>Go Back</Link>
            <h1>Edit Event</h1>
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
                <input type="submit" value={'Edit Event'} className={'btn'}/>
            </form>
            <h2>Event Image</h2>
            {imagePreview? (
                <Image src={imagePreview} height={100} width={170}/>
            ): <div><p>No Image uploaded</p></div>}
            <div>
                <button onClick={()=> setShowModal(true)} className="btn-secondary"><FaImage/> Set Image</button>
            </div>
            <Modal show={showModal} onClose={()=> setShowModal(false)}>
                <ImageUpload evtId={evt.id} imageUploaded={imageUploaded}/>
            </Modal>
        </Layout>
    );
};

export default EditEventPage;
export async function getServerSideProps({params: {id}, req}){
     const res = await fetch(`${API_URL}/events/${id}`)
    const evt = await res.json();
    console.log(req.headers.cookie)
    return {
        props: {evt}
    }
}
