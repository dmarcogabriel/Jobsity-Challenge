import {TextInput} from 'react-native-paper';
import {useState, useRef} from 'react';

type IProps = {
  onSearch: (search: string) => void;
  isDisabled?: boolean;
};

export default function SearchSeriesInput({
  onSearch,
  isDisabled = false,
}: IProps) {
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
      mode="outlined"
      disabled={isDisabled}
      left={<TextInput.Icon icon="magnify" />}
    />
  );
}
