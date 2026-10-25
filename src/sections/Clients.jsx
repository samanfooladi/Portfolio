import { clientReviews } from "../constants/index.js";

const Clients = () => {
  return (
    <section className="c-space m-20">
      <h3 className="head-text">Hear from my Clients</h3>
      {clientReviews.length === 0 ? (
        <div className="client-empty">
          <p className="text-white-600 md:text-3xl text-2xl font-semibold">
            No reviews set
          </p>
        </div>
      ) : (
        <div className="client-container">
          {clientReviews.map(({ id, name, review, img, position }) => (
            <div key={id} className="client-review">
              <p className="text-white font-light">{review}</p>
              <div className="client-content">
                <div className="flex gap-3">
                  <img
                    src={img}
                    alt={name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-white-800">{name}</p>
                    <p className="text-white-500 md:text-base text-sm font-light">
                      {position}
                    </p>
                  </div>
                </div>
                <div className="flex self-end items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <img
                      key={index}
                      src="/assets/star.png"
                      alt="star"
                      className="w-5 h-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
export default Clients;
