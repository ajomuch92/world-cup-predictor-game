import CreateLeagueButton from '../components/CreateLeagueButton';
import JoinLeagueButton from '../components/JoinLeagueButton';

const League = () => {
  return (
    <>
      <section className="a-flex gap-1">
        <CreateLeagueButton />
        <JoinLeagueButton />
      </section>
    </>
  );
};

export default League;