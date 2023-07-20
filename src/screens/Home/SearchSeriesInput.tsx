import {TextInput} from 'react-native-paper';
import {useState, useRef} from 'react';

type IProps = {
  onSearch: (search: string) => void;
};

export default function SearchSeriesInput({onSearch}: IProps) {
  const [search, setSearch] = useState('');
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleChangeSearch = (value: string) => {
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, 600);
  };

  return (
    <TextInput
      placeholder="Search your favorite serie here"
      value={search}
      onChangeText={handleChangeSearch}
    />
  );
}
