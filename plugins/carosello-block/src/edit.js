/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { PanelBody, FormTokenField } from '@wordpress/components';

import { useState } from 'react';
import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function getTripImagePublicId(trip) {
    return "https://res.cloudinary.com/dxvgecjzm/image/upload/w_768,c_scale/f_auto/" + (JSON.parse(trip.thumbnail_cloudinary))._public_id;
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const { codweb } = attributes;
    const [selectedCodwebs, setSelectedCodwebs] = useState(codweb);
    let data = Object.values(jsonData).filter((element) => element.thumbnail_cloudinary != null);
    let suggestCodweb = data.map(el => el.codweb).sort();

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Viaggi', 'carosello-block')}>
                    <FormTokenField
                        multiple
                        label="Lista Codweb"
                        suggestions={suggestCodweb}
                        onChange={(value) => {
                            setAttributes({ codweb: value });
                            setSelectedCodwebs(value);
                        }}
                        __experimentalValidateInput={(value) => suggestCodweb.includes(value)}
                        value={selectedCodwebs}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()} >
                                    <div class="carosello-list">
                                        {typeof selectedCodwebs !== 'undefined' ? selectedCodwebs.map((cod, index) => (
                                            data
                                                .filter(trip => trip.codweb === cod)
                                                .map((trip, tripIndex) => {
                                                    const thumbnail = getTripImagePublicId(trip);
                                                    return (
                                                        
                                                        <div
                                                            key={`${index}-${tripIndex}`}
                                                            
                                                            className="item-home owl-carousel-item"
                                                        >
                                                            <div className="item-img-cont">
                                                                <img
                                                                    src={thumbnail}
                                                                    alt=""
                                                                    className="item-img wp-image-72793"
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                            <div className="item-texts">
                                                                <div className="item-texts-top">
                                                                    <p className="title">{trip.tour}</p>
                                                                    <p className="subtitle">{`${trip.activities_name[0].name} ${trip.formula.name}`}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    );
                                                })
                                        )): "Carosello viaggi Girolibero - Nessun viaggio inserito!"}
                                    </div>
                                </div>
        </>
    );
}
