export default function ImageRenderer  (params) {
    const imageUrlArray = params.value.map((member) => member.url);
    return imageUrlArray.map((url, index) => (
      <img key={index} src={url} alt={`Member ${index + 1}`} className='grid-profile-img' />
    ));
  };