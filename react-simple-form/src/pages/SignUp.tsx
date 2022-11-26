import React, { useEffect, useRef, useState } from 'react';
import {
    Formik,
    Field,
    Form,
    ErrorMessage,
    FormikHelpers,
    FormikValues,
} from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { getCitiesData, getCountriesData } from '../services';

interface CountryProps {
    code: string;
    name_ptbr: string;
    name: string;
}

interface CityProps {
    country_code: string;
    name_ptbr: string;
    name: string;
}

interface Place {
    city: string;
    country: string;
}

interface IUser {
    name: string;
    phone: string;
    email: string;
    cpf: string;
    places: Place[];
}

function selectedCity(
    countries: CountryProps[],
    cities: CityProps[],
    currentCountry: string
) {
    let str = '';
    if (cities.length === 0) {
        let tempCountry = countries.find((country) =>
            currentCountry ? country.code === currentCountry : false
        );
        if (tempCountry)
            str = tempCountry.name_ptbr
                ? tempCountry.name_ptbr
                : tempCountry.name
                ? tempCountry.name
                : tempCountry.code;
    } else
        str = cities[0].name_ptbr
            ? cities[0].name_ptbr
            : cities[0].name
            ? cities[0].name
            : cities[0].country_code;
    return str;
}

function sortResponseData(
    a: CountryProps | CityProps,
    b: CountryProps | CityProps
) {
    let name1 = a.name_ptbr ? a.name_ptbr.toLowerCase() : a.name.toLowerCase(),
        name2 = b.name_ptbr ? b.name_ptbr.toLowerCase() : b.name.toLowerCase();
    return name1 !== name2 ? (name1 < name2 ? -1 : 1) : 0;
}

function isValidCpf(str: string): boolean {
    if (!str || str === '00000000000') return false;
    let sum;
    let left;
    sum = 0;

    for (let i = 1; i <= 9; i++)
        sum = sum + parseInt(str.substring(i - 1, i)) * (11 - i);
    left = (sum * 10) % 11;

    if (left === 10 || left === 11) left = 0;
    if (left !== parseInt(str.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
        sum = sum + parseInt(str.substring(i - 1, i)) * (12 - i);
    left = (sum * 10) % 11;

    if (left === 10 || left === 11) left = 0;
    if (left !== parseInt(str.substring(10, 11))) return false;
    return true;
}

const validationSchema = () => {
    return yup.object().shape({
        email: yup.string().email().required(),
        phone: yup
            .string()
            .matches(
                /^((1[1-9])|21|22|24|27|28|(3[1-5])|(3[7-8])|(4[1-9])|51|(5[3-5])|(6[1-9])|(7[1-5])|77|78|(8[1-9]|(9[1-9])))(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/
            )
            .required(),
        cpf: yup
            .string()
            .test(
                'Valid ${path}',
                'This is not a valid value for ${path}',
                (value) => (value ? isValidCpf(value) : false)
            )
            .required(),

        name: yup.string().min(3).max(16).trim().required(),
    });
};

const SignUp: React.FC<{}> = () => {
    const [currentCountry, setCurrentCountry] = useState<string>();
    const [currentCity, setCurrentCity] = useState<string>();
    const [places, setPlaces] = useState<Place[]>([]);

    const [countries, setCountries] = useState<CountryProps[]>([]);
    const [cities, setCities] = useState<CityProps[]>([]);
    const [filteredCities, setFilteredCities] = useState<CityProps[]>([]);
    const navigate = useNavigate();
    const effectCalled = useRef(false);

    const fetchData = async () => {
        try {
            const responseCountries = await getCountriesData();

            const filteredCountries: CountryProps[] =
                responseCountries.data.map(
                    ({ name, name_ptbr, code }: CountryProps) => ({
                        name_ptbr,
                        name,
                        code,
                    })
                );

            filteredCountries.sort(sortResponseData);
            let defaultCountry: CountryProps | undefined =
                filteredCountries.length > 0 ? filteredCountries[0] : undefined;

            setCountries(filteredCountries);

            const responseCities = await getCitiesData();

            const data: CityProps[] = responseCities.data.map(
                ({ name, country_code, name_ptbr }: CityProps) => ({
                    country_code,
                    name,
                    name_ptbr,
                })
            );

            data.sort(sortResponseData);
            setCities(data);

            if (defaultCountry) {
                setCurrentCountry(defaultCountry.code);
                let temp = data.filter(
                    (c: CityProps) => c.country_code === defaultCountry!.code
                );
                setFilteredCities(temp);

                setCurrentCity(
                    selectedCity(filteredCountries, temp, defaultCountry.code)
                );
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (effectCalled.current) return;
        fetchData();
        effectCalled.current = true;
    }, []);

    const addPlace = () => {
        console.log('addPlace');
        console.log({ country: currentCountry, city: currentCity });

        if (!currentCity || !currentCountry) return;

        setPlaces([...places, { country: currentCountry, city: currentCity }]);
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen gap-2">
            <Formik
                initialValues={{ name: '', email: '', phone: '', cpf: '' }}
                validationSchema={validationSchema}
                onSubmit={function (
                    values: FormikValues,
                    formikHelpers: FormikHelpers<FormikValues>
                ): void | Promise<any> {
                    throw new Error('Function not implemented.');
                }}
            >
                {({ errors, touched, resetForm }) => (
                    <Form className="flex flex-col  w-96 h-96 gap-5 justify-center items-center bg-blue-200">
                        <span>Dados Pessoais</span>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label>Name </label>
                                <Field
                                    name={'name'}
                                    type={'text'}
                                    error={errors.name}
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div>
                                <label>Email </label>
                                <Field
                                    name={'email'}
                                    type={'text'}
                                    error={errors.email}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div>
                                <label>Phone </label>
                                <Field
                                    name={'phone'}
                                    type={'text'}
                                    error={errors.phone}
                                />
                                <ErrorMessage
                                    name="phone"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div>
                                <label>Cpf </label>
                                <Field
                                    name={'cpf'}
                                    type={'text'}
                                    error={errors.cpf}
                                />
                                <ErrorMessage
                                    name="cpf"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="px-4 bg-red-400 rounded hover:bg-red-600"
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>

            <Formik
                initialValues={{ country: '', city: '' }}
                onSubmit={function (
                    values: { country: string; city: string },
                    formikHelpers: FormikHelpers<{
                        country: string;
                        city: string;
                    }>
                ): void | Promise<any> {
                    addPlace();
                }}
            >
                {({ errors, touched, resetForm }) => (
                    <Form className="flex flex-col  w-96 h-96 gap-5 justify-center items-center bg-blue-200">
                        <span className="text-lg">Destino de Interesses</span>

                        <div className="overflow-y-scroll scrollbar-hide">
                            <div className="flex flex-col justify-center items-center gap-1">
                                {places.length === 0 ? (
                                    <span className="text-red-500 text-sm"></span>
                                ) : (
                                    ''
                                )}
                                {places
                                    ? places.map((place, index) => {
                                          return (
                                              <div
                                                  key={place.city + index}
                                                  className="flex bg-white text-center rounded px-2"
                                              >
                                                  <span className="text-sm">
                                                      {place.city}
                                                  </span>

                                                  <span className="px-1">
                                                      -
                                                  </span>

                                                  <span className="text-sm">
                                                      {place.country}
                                                  </span>
                                              </div>
                                          );
                                      })
                                    : []}
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1 justify-center items-center">
                                    <span>País</span>
                                    <select
                                        className="w-44 px-2 py-1"
                                        onChange={(e) => {
                                            let temp = cities.filter(
                                                (c) =>
                                                    c.country_code ===
                                                    e.target.value
                                            );
                                            setFilteredCities(temp);

                                            setCurrentCity(
                                                selectedCity(
                                                    countries,
                                                    temp,
                                                    e.target.value
                                                )
                                            );

                                            setCurrentCountry(e.target.value);
                                        }}
                                    >
                                        {countries.length > 0 ? (
                                            countries.map((item, index) => {
                                                return (
                                                    <option
                                                        className="text-center"
                                                        key={index + item.name}
                                                        value={item.code}
                                                    >
                                                        {item.name_ptbr
                                                            ? item.name_ptbr
                                                            : item.name
                                                            ? item.name
                                                            : '-----'}
                                                    </option>
                                                );
                                            })
                                        ) : (
                                            <option
                                                key={'-----'}
                                                value={undefined}
                                            >
                                                {'-----'}
                                            </option>
                                        )}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1 justify-center items-center">
                                    <span>Cidade</span>

                                    <select
                                        className="w-44 px-2 py-1"
                                        onChange={(e) => {
                                            setCurrentCity(e.target.value);
                                        }}
                                    >
                                        {filteredCities.length > 0 ? (
                                            filteredCities.map(
                                                (item, index) => {
                                                    let str = item.name_ptbr
                                                        ? item.name_ptbr
                                                        : item.name
                                                        ? item.name
                                                        : '-----';
                                                    return (
                                                        <option
                                                            className="text-center"
                                                            key={
                                                                index +
                                                                item.name
                                                            }
                                                            value={str}
                                                        >
                                                            {str}
                                                        </option>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <option
                                                key={'-----'}
                                                value={undefined}
                                            >
                                                {'-----'}
                                            </option>
                                        )}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="cursor-pointer text-center bg-red-200 rounded hover:bg-red-400"
                                >
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;
