const CarouselArrow = (props) => {
  const { className, style, onClick, baseColor } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: baseColor,
        borderRadius: '50%',
      }}
      onClick={onClick}
    />
  );
};

export default CarouselArrow;
