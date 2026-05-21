'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import FormInput from "../form/formInput";
import useDebounce from "@/utils/debounce";

const SearchWidget = () => {
    const [phrase, setPhrase] = useState('');
    const router = useRouter();
    const debouncedSearch = useDebounce(phrase, 1000);

    useEffect(() => {
      const trimmed = debouncedSearch.trim();
      if (trimmed) {
        router.push(`/dashboard/search/${encodeURIComponent(trimmed)}`);
      }
    }, [debouncedSearch, router])

    return (
        <div className="searchWidget">
            <FormInput type="text" label={'Search...'} classes={['-small']} value={phrase} onInputChange={(event) => {
                setPhrase(event.target.value);
            }}></FormInput>
        </div>
    );
}

export default SearchWidget;
